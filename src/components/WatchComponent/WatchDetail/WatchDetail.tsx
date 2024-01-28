import { FC, memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './WatchDetail.module.scss';

interface WatchDetailProps {
    className?: string | { [key: string]: string | boolean | undefined };
    title?: string;
    views?: string | number | undefined;
    desc?: string | null | undefined;
    alternativeTitles?: string[] | string | number | number[] | null | undefined;
    genres?: string[] | string | null | undefined;
    tags?: string[] | string | null | undefined;
    studios?: string[] | string | null | undefined;
    release?: string | number | null | undefined;
    data?: { [key: string]: string | string[] | number | null | undefined } | undefined;
}

const WatchDetail: FC<WatchDetailProps> = ({
    className: cusClassName,
    title,
    views,
    desc,
    alternativeTitles,
    genres,
    tags,
    studios,
    release,
    data,
}) => {
    const cx = useMemo(() => useClassNames(style), []);
    const classes = cx('wrapper', cusClassName || '');

    const renderDetailTags = (
        label: string,
        items:
            | string
            | string[]
            | number
            | number[]
            | { id?: number; name?: string; slug?: string; taxonomy?: string; thumbnail?: string },
    ) => {
        return (
            <div className={cx('details__tags')}>
                <span className={cx('details__label')}>{label}:</span>
                {(Array.isArray(items) &&
                    items.map(
                        (
                            value:
                                | string
                                | number
                                | { name?: string; [key: string]: string | number | undefined },
                            index: number,
                            itemsArr: string[] | number[],
                        ) => {
                            return (
                                <span key={index}>
                                    <Link className={cx('details__tag-item')} to="#!">
                                        {index + 1 !== itemsArr.length
                                            ? typeof value === 'string'
                                                ? value + ', '
                                                : typeof value === 'object' && value.name + ', '
                                            : typeof value === 'string'
                                            ? value
                                            : typeof value === 'object' && value.name}
                                    </Link>
                                </span>
                            );
                        },
                    )) || (
                    <span>
                        <Link className={cx('details__tag-item')} to="#!">
                            {items.toString()}
                        </Link>
                    </span>
                )}
            </div>
        );
    };

    const renderSynopsis = useCallback((p: string | number | string[] | null | undefined) => {
        if (typeof p === 'string') {
            return p.split('\n').map((item: string | undefined, index: number) => (
                <p className={cx('details__desc')} key={index}>
                    {item}
                </p>
            ));
        } else {
            return <div className={cx('details__desc')}>{`${p}`}</div>;
        }
    }, []);

    return (
        <div className={classes}>
            <div className={cx('details')}>
                <div className={cx('details__left')}>
                    <h2 className={cx('details__title')}>{title || data?.title}</h2>
                    <div className={cx('details__view')}>{views || data?.views}</div>
                    {renderSynopsis(desc || data?.synopsis)}
                </div>
                <div className={cx('details__right')}>
                    {/* Alternative Title */}
                    {(alternativeTitles && renderDetailTags('Alternative Titles:', alternativeTitles)) ||
                        (data?.alternativeTitles &&
                            renderDetailTags('Alternative Titles:', data.alternativeTitles))}

                    {/* Genres */}
                    {(genres && renderDetailTags('Genres:', genres)) ||
                        (data?.genres && renderDetailTags('Genres:', data.genres))}

                    {/* Tags */}
                    {(tags && renderDetailTags('Tags:', tags)) ||
                        (data?.tags && renderDetailTags('Tags:', data.tags))}

                    {/* Studios */}
                    {(studios && renderDetailTags('Studios:', studios)) ||
                        (data?.studios && renderDetailTags('Studios:', data.studios))}

                    {/* Release */}
                    {(release && renderDetailTags('Release:', release)) ||
                        (data?.release && renderDetailTags('Release:', data.release))}
                </div>
            </div>
        </div>
    );
};

export default memo(WatchDetail);
