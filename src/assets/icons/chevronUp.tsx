function ChevronUpIcon({ className = '', width = '1em', height = '1em', ...rest }) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 512 512"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 328l144-144 144 144"
            />
        </svg>
    );
}

export default ChevronUpIcon;
