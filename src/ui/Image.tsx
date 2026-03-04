type ImageProps = {
	src: string;
	alt: string;
};

const Image = ({ src, alt = "" }: ImageProps) => {
	return (
		<img
			src={src}
			alt={alt}
			className={`w-[200px] h-[120px] object-cover rounded-md border-2 border-green-medium`}
		/>
	);
};

export default Image;
