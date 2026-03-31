export type InputProps = {
	type?:
		| "text"
		| "email"
		| "checkbox"
		| "password"
		| "url"
		| "number"
		| "search";
	isTextArea?: boolean;
	placeholder?: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	checked?: boolean;
	value?: string;
	name?: string;
	width?: string;
	readonly?: boolean;
};
