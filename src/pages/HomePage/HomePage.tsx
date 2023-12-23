import { useEffect, useRef, useState } from 'react';

import { useClassNames } from '~/hooks';
import style from './HomePage.module.scss';
import ListVideo from '~/components/ListVideo';
import * as homeService from '~/services/homeService';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    const cx = useClassNames(style);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef<any>();

    useEffect(() => {
        const fetchHomeData = async () => {
            setIsLoading(true);
            try {
                const data = await homeService.home();
                setData(data?.sections);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <section className={cx('wrapper')}>
            <div className={cx('container')} ref={containerRef}>
                {!isLoading && (
                    <>
                        {data.map((item, index) => {
                            return <ListVideo key={index} className={cx('list-video')} data={item} />;
                        })}
                    </>
                )}
            </div>
            <Outlet />
        </section>
    );
};

export default HomePage;
