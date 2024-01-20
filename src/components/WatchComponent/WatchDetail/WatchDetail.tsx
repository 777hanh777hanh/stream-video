import { FC, memo, useMemo } from 'react';
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

    const renderDetailTags = (label: string, items: string | string[] | number | number[]) => {
        return (
            <div className={cx('details__tags')}>
                <span className={cx('details__label')}>{label}:</span>
                {(Array.isArray(items) &&
                    items.map((value: string | number, index: number, itemsArr: string[] | number[]) => {
                        return (
                            <span key={index}>
                                <Link className={cx('details__tag-item')} to="#!">
                                    {(index + 1 !== itemsArr.length && value + ', ') || value}
                                </Link>
                            </span>
                        );
                    })) || (
                    <span>
                        <Link className={cx('details__tag-item')} to="#!">
                            {items}
                        </Link>
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className={classes}>
            <div className={cx('details')}>
                <div className={cx('details__left')}>
                    <h2 className={cx('details__title')}>{title || data?.title}</h2>
                    <div className={cx('details__view')}>{views || data?.views}</div>
                    <div className={cx('details__desc')}>{desc || data?.desc}</div>
                </div>
                <div className={cx('details__right')}>
                    {/* Alternative Title */}
                    {(alternativeTitles && renderDetailTags('Alternative Titles:', alternativeTitles)) ||
                        (data?.alternativeTitles &&
                            renderDetailTags('Alternative Titles:', data.alternativeTitles))}

                    {/* Genres */}
                    {(genres && renderDetailTags('Genres:', genres)) ||
                        (data?.genres && renderDetailTags('Alternative Titles:', data.genres))}

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
