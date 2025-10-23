import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@/components/dialog/Dialog';
import { useAuthDialog } from '@/context/auth/AuthDialogContext';
import { useAuthStore } from '@/stores/authStore';
import Textfield from '@/components/textfield/Textfield';
import Link from '@/components/link/Link';
import Button from '@/components/button/Button';
import { ArrowLeftIcon } from '@/components/icons/Icons';
import Warning from '@/components/warning/Watning';
import { useTranslation } from 'react-i18next';
import { authenticateMockUser, getRedirectPathForRole, MockAuthError, validateEmailExists } from '@/services/auth/mockAuth';
import './auth.scss';

type AuthView = 'login' | 'forgotPassword' | 'signup';

export default function Auth() {
  const { t } = useTranslation<'auth'>('auth');
  const { isOpen, setDialogOpen } = useAuthDialog();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formId = 'auth-dialog-form';
  const ICON_SIZE = 18;

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const clearFieldErrors = useCallback(() => {
    setEmailError(false);
    setPasswordError(false);
  }, []);

  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
    setError(null);
    setSuccess(null);
  }, []);

  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setError(null);
  }, []);

  const handleInviteCodeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInviteCode(event.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const hasEmailError = trimmedEmail === '';
    const hasPasswordError = trimmedPassword === '';

    setEmailError(hasEmailError);
    setPasswordError(hasPasswordError);

    if (hasEmailError || hasPasswordError) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const authenticatedUser = await authenticateMockUser(trimmedEmail, trimmedPassword);
      const destination = getRedirectPathForRole(authenticatedUser.type);

      login(authenticatedUser);
      setDialogOpen(false);
      setEmail('');
      setPassword('');
      setEmailError(false);
      setPasswordError(false);
      navigate(destination, { replace: true });
    } catch (caughtError) {
      setEmailError(false);
      setPasswordError(false);
      if (caughtError instanceof MockAuthError) {
        setError(t(`errors.${caughtError.code}`));
      } else {
        setError(t('errors.generic'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterClick = useCallback(() => {
    clearMessages();
    clearFieldErrors();
    setPassword('');
    setInviteCode('');
    setConfirmPassword('');
    setView('signup');
  }, [clearMessages, clearFieldErrors]);

  const handleForgotPasswordClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setView('forgotPassword');
    clearMessages();
    clearFieldErrors();
  }, [clearMessages, clearFieldErrors]);

  const handleBackToLogin = useCallback(() => {
    setView('login');
    clearMessages();
    setEmailError(false);
    setPassword('');
    setInviteCode('');
    setConfirmPassword('');
  }, [clearMessages]);

  const handleForgotPasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedEmail = email.trim();
    const hasEmailError = trimmedEmail === '';

    setEmailError(hasEmailError);

    if (hasEmailError) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const emailExists = await validateEmailExists(trimmedEmail);
      
      if (emailExists) {
        setSuccess(t('forgotPasswordScreen.success'));
      } else {
        setError(t('forgotPasswordScreen.emailNotFound'));
      }
    } catch (caughtError) {
      setError(t('errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    form.reportValidity();

    const trimmedEmail = email.trim();
    const trimmedInviteCode = inviteCode.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    const hasEmptyFields = !trimmedEmail || !trimmedInviteCode || !trimmedPassword || !trimmedConfirmPassword;

    if (hasEmptyFields) {
      setError(null);
      setSuccess(null);
      return;
    }

    if (trimmedPassword.length < 8) {
      setError(t('signupScreen.errors.passwordTooShort'));
      setSuccess(null);
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError(t('signupScreen.errors.passwordMismatch'));
      setSuccess(null);
      return;
    }

    setError(null);
    setSuccess(null);

    // TODO: implement signup flow
  }, [email, inviteCode, password, confirmPassword, t]);

  const dialogTitle = view === 'forgotPassword'
    ? t('forgotPasswordScreen.title')
    : view === 'signup'
      ? t('signupScreen.title')
      : t('title');

  const dialogSubtitle = view === 'forgotPassword'
    ? t('forgotPasswordScreen.subtitle')
    : view === 'signup'
      ? t('signupScreen.subtitle')
      : t('subtitle');
  const backIcon = <ArrowLeftIcon size={ICON_SIZE} />;

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={setDialogOpen}
      title={dialogTitle}
      subtitle={dialogSubtitle}
      actions={
        view === 'forgotPassword' ? (
          <div className="dialog-actions-content">
            <div className="dialog-actions-buttons">
              <Button
                variant="border"
                size="md"
                text={t('back')}
                icon={backIcon}
                iconPosition="left"
                className="dialog-actions-secondary"
                type="button"
                onClick={handleBackToLogin}
                disabled={isSubmitting}
              />
              <Button
                variant="solid"
                size="md"
                text={t('forgotPasswordScreen.submit')}
                className="dialog-actions-primary"
                type="submit"
                form={formId}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
          </div>
        ) : view === 'signup' ? (
          <div className="dialog-actions-content">
            <div className="dialog-actions-buttons">
              <Button
                variant="border"
                size="md"
                text={t('back')}
                className="dialog-actions-secondary"
                type="button"
                onClick={handleBackToLogin}
                icon={backIcon}
                iconPosition="left"
                disabled={isSubmitting}
              />
              <Button
                variant="solid"
                size="md"
                text={t('submit')}
                className="dialog-actions-primary"
                type="submit"
                form={formId}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
          </div>
        ) : (
          <div className="dialog-actions-content">
            <span className="dialog-actions-support-text">{t('prompt.question')}</span>
            <div className="dialog-actions-buttons">
              <Button
                variant="border"
                size="md"
                text={t('register')}
                className="dialog-actions-secondary"
                type="button"
                onClick={handleRegisterClick}
              />
              <Button
                variant="solid"
                size="md"
                text={t('submit')}
                className="dialog-actions-primary"
                type="submit"
                form={formId}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
          </div>
        )
      }
    >
      {view === 'signup' ? (
        <>
          <form
            id={formId}
            className="auth-form"
            onSubmit={handleSignupSubmit}
            noValidate
          >
            <div className="auth-fields">
              <Textfield
                label={t('email.label')}
                placeholder={t('email.placeholder')}
                type="email"
                id="signup-email"
                name="signup-email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
                required
              />
              <Textfield
                label={t('signupScreen.invitationCode.label')}
                placeholder={t('signupScreen.invitationCode.placeholder')}
                id="signup-invite-code"
                name="signup-invite-code"
                value={inviteCode}
                onChange={handleInviteCodeChange}
                disabled={isSubmitting}
                required
              />
              <Textfield
                label={t('password.label')}
                placeholder={t('signupScreen.password.placeholder')}
                type="password"
                id="signup-password"
                name="signup-password"
                autoComplete="new-password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isSubmitting}
                required
              />
              <Textfield
                label={t('signupScreen.confirmPassword.label')}
                placeholder={t('signupScreen.confirmPassword.placeholder')}
                type="password"
                id="signup-confirm-password"
                name="signup-confirm-password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isSubmitting}
                required
              />
            </div>
          </form>
          {error ? <Warning variant="error" message={error} /> : null}
        </>
      ) : (
        <form
          id={formId}
          className="auth-form"
          onSubmit={view === 'forgotPassword' ? handleForgotPasswordSubmit : handleSubmit}
          noValidate
        >
          <div className="auth-fields">
            <Textfield
              label={t('email.label')}
              placeholder={t('email.placeholder')}
              type="email"
              id="auth-email"
              name="auth-email"
              autoComplete="username"
              value={email}
              onChange={handleEmailChange}
              disabled={isSubmitting}
              error={emailError}
              required
            />
            {view === 'login' ? (
              <Textfield
                placeholder={t('password.placeholder')}
                type="password"
                id="auth-password"
                name="auth-password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isSubmitting}
                error={passwordError}
                required
                label={t('password.label')}
                labelSuffix={(
                  <Link
                    to="#forgot-password"
                    label={t('forgotPassword')}
                    variant="subtle"
                    onClick={handleForgotPasswordClick}
                  />
                )}
              />
            ) : null}
          </div>
          {success ? <Warning variant="success" message={success} /> : null}
          {error ? <Warning variant="error" message={error} /> : null}
        </form>
      )}
    </Dialog>
  );
}
