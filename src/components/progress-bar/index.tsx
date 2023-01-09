import { ProgressBar as Loader } from 'reprogressbars';

interface IProgressBarProps {
  isLoading: boolean;
  customizeProgressBar?: string;
}

export const ProgressBar = ({ customizeProgressBar, isLoading }: IProgressBarProps) => {
  return (
    <Loader
      height={'5px'}
      isLoading={isLoading}
      color='#64d8ef'
      useBoxShadow={false}
      className={`progress-bar ${customizeProgressBar}`}
    />
  )
}