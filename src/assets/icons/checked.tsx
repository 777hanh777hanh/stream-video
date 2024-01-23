function CheckedIcon({ className = '', width = '1em', height = '1em', ...rest }) {
    return (
        <svg
            className={className + 'svg'}
            width={width}
            height={height}
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={`inherit`}
                d="M416 128L192 384l-96-96"
            />
        </svg>
    );
}

export default CheckedIcon;
