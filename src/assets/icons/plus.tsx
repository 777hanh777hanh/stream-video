function HeartIcon({ className = '', width = '1em', height = '1em', ...rest }) {
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
                strokeWidth="60"
                d="M256 112v288M400 256H112"
            />
        </svg>
    );
}

export default HeartIcon;
