import { forwardRef, type ReactNode } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import { TextField as RadixTextField } from '@radix-ui/themes';
import './textfield.scss';

type RadixTextFieldProps = ComponentPropsWithoutRef<typeof RadixTextField.Root>;

export interface TextfieldProps extends RadixTextFieldProps {
	readonly id: string;
	readonly label: ReactNode;
	readonly description?: string;
	readonly wrapperClassName?: string;
	readonly error?: boolean;
}

function TextfieldComponent(
	{
		id,
		label,
		description,
		wrapperClassName,
		className,
		error = false,
		...inputProps
	}: TextfieldProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const fieldClass = `app-textfield${wrapperClassName ? ` ${wrapperClassName}` : ''}`;
	const errorClass = error ? ' app-textfield-input--error' : '';
	const inputClass = `app-textfield-input${errorClass}${className ? ` ${className}` : ''}`;
	const descriptionId = description ? `${id}-description` : undefined;

	return (
		<div className={fieldClass}>
			<label className="app-textfield-label" htmlFor={id}>
				{label}
			</label>

			<RadixTextField.Root
				id={id}
				ref={ref}
				className={inputClass}
				aria-describedby={descriptionId}
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
