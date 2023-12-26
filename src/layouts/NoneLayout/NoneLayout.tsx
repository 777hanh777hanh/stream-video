import { ReactNode, FC } from 'react';

interface NoneLayoutProps {
    children?: ReactNode;
}

const NoneLayout: FC<NoneLayoutProps> = ({ children }: NoneLayoutProps) => {
    return children;
};

export default NoneLayout;
