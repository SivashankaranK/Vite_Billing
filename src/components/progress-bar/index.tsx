import { ProgressBar as Loader } from 'reprogressbars';

interface IProgressBarProps {
	isLoading: boolean;
	customizeProgressBar?: string;
}

export const ProgressBar = ({ customizeProgressBar, isLoading }: IProgressBarProps) => {
	return (
		<Loader
			height={'3px'}
			isLoading={isLoading}
			color='#e53f31'
			useBoxShadow={false}
			className={`progress-bar ${customizeProgressBar}`}
		/>
	);
};
