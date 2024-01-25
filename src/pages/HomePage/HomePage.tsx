import { useEffect, useState } from 'react';

import { useClassNames } from '~/hooks';
import style from './HomePage.module.scss';
import ListVideo from '~/components/ListVideo';
import * as homeService from '~/services/homeService';

const HomePage = () => {
    const cx = useClassNames(style);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchSuccess, setIsFetchSuccess] = useState(false);

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
                timerId = reconnect(3000);
            }
        };

        function reconnect(duration: number = 1000) {
            // reconnect after duration
            let timerId: any = undefined;
            timerId = setTimeout(() => {
                clearTimeout(timerId);
                fetchHomeData();
            }, duration);

            return timerId;
        }

        fetchHomeData();

        // cleanup function
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <>
            <section className={cx('wrapper')}>
                <div className={cx('container')}>
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
