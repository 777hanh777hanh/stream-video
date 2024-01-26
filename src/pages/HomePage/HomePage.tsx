import { useEffect, useRef, useState } from 'react';

import { useClassNames } from '~/hooks';
import style from './HomePage.module.scss';
import ListVideo from '~/components/ListVideo';
import * as homeService from '~/services/homeService';

const HomePage = () => {
    const cx = useClassNames(style);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchSuccess, setIsFetchSuccess] = useState(false);

    const countReconnect = useRef(0);

    useEffect(() => {
        let timerId: any = undefined;

        const fetchHomeData = async () => {
            setIsLoading(true);
            try {
                const data = await homeService.home();
                setData(data?.sections);
                setIsLoading(false);
                setIsFetchSuccess(true);
            } catch (error) {
                setIsLoading(false);
                setIsFetchSuccess(false);

                // after 3 seconds, fetch again
                timerId = reconnect(5000, fetchHomeData);
            }
        };

        fetchHomeData();

        // cleanup function
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    function reconnect(duration: number = 1000, callback?: Function) {
        // reconnect after duration
        if (countReconnect.current < 3) {
            const timerId = setTimeout(() => {
                if (callback) callback();
            }, duration);

            countReconnect.current += 1;

            return timerId;
        } else {
            window.location.reload();
        }
    }

    return (
        <>
            <section className={cx('wrapper')}>
                <div className={cx('container')}>
                    {isLoading && (
                        <div className={cx('loading')}>
                            <span>Loading...</span>
                        </div>
                    )}

                    {!isLoading && isFetchSuccess && (
                        <>
                            {data &&
                                data.map((item, index) => {
                                    return <ListVideo key={index} className={cx('list-video')} data={item} />;
                                })}
                        </>
                    )}
                    {!isLoading && !isFetchSuccess && (
                        <div className={cx('no-data')}>
                            <span>Không có dữ liệu</span>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default HomePage;
