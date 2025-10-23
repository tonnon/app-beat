import { forwardRef, useCallback, useState } from 'react';
import type {
	InputHTMLAttributes,
	ReactNode,
	ForwardedRef,
	FormEventHandler,
} from 'react';
import './textfield.scss';

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
	readonly id: string;
	readonly label: ReactNode;
	readonly description?: string;
	readonly wrapperClassName?: string;
	readonly error?: boolean;
	readonly labelSuffix?: ReactNode;
}

function TextfieldComponent(
	{
		id,
		label,
		description,
		wrapperClassName,
		className,
		error = false,
		labelSuffix,
		onInvalid: inputOnInvalid,
		onInput: inputOnInput,
		...inputProps
	}: TextfieldProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const [isInvalid, setIsInvalid] = useState(false);
	const fieldClass = `app-textfield${wrapperClassName ? ` ${wrapperClassName}` : ''}`;
	const inputClasses = ['app-textfield-input'];
	if (error || isInvalid) {
		inputClasses.push('app-textfield-input--error');
	}
	if (className) {
		inputClasses.push(className);
	}
	const inputClass = inputClasses.join(' ');
	const descriptionId = description ? `${id}-description` : undefined;
	const isRequired = Boolean(inputProps.required);

	const handleInvalid = useCallback<FormEventHandler<HTMLInputElement>>((event) => {
		event.preventDefault();
		event.currentTarget.setCustomValidity(' ');
		setIsInvalid(true);
		if (typeof inputOnInvalid === 'function') {
			inputOnInvalid(event);
		}
	}, [inputOnInvalid]);

	const handleInput = useCallback<FormEventHandler<HTMLInputElement>>((event) => {
		event.currentTarget.setCustomValidity('');
		if (isInvalid) {
			setIsInvalid(false);
		}
		if (typeof inputOnInput === 'function') {
			inputOnInput(event);
		}
	}, [inputOnInput, isInvalid]);

	return (
		<div className={fieldClass}>
			<label className="app-textfield-label" htmlFor={id}>
				<span className="app-textfield-label-content">
					{label}
					{isRequired ? (
						<span aria-hidden="true" className="app-textfield-required-indicator">
							*
						</span>
					) : null}
				</span>
				{labelSuffix}
			</label>

			<input
				id={id}
				ref={ref}
				className={inputClass}
				aria-describedby={descriptionId}
				onInvalid={handleInvalid}
				onInput={handleInput}
				aria-invalid={error || isInvalid || undefined}
				{...inputProps}
			/>

			{description ? (
				<p id={descriptionId} className="app-textfield-description">
					{description}
				</p>
			) : null}
		</div>
	);
}

const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(TextfieldComponent);

Textfield.displayName = 'Textfield';

export default Textfield;
