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

type AuthView = 'login' | 'forgotPassword';

export default function Auth() {
  const { t } = useTranslation('auth');
  const { isOpen, setDialogOpen } = useAuthDialog();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setDialogOpen(false);
  }, [setDialogOpen]);

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

  const dialogTitle = view === 'forgotPassword' ? t('forgotPasswordScreen.title') : t('title');
  const dialogSubtitle = view === 'forgotPassword' ? t('forgotPasswordScreen.subtitle') : t('subtitle');
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
              label={(
                <>
                  <span>{t('password.label')}</span>
                  <Link
                    to="#forgot-password"
                    label={t('forgotPassword')}
                    variant="subtle"
                    onClick={handleForgotPasswordClick}
                  />
                </>
              )}
            />
          ) : null}
        </div>
        {success ? <Warning variant="success" message={success} /> : null}
        {error ? <Warning variant="error" message={error} /> : null}
      </form>
    </Dialog>
  );
}
