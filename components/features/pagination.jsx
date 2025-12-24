import React from 'react';
import { useRouter } from 'next/router';

function Pagination(props) {
    const { maxShowCounts = 7, totalPage = 1, distance = 2 } = props;

    const router = useRouter();
    const query = router.query;
    const page = query.page ? parseInt(query.page) : 1;
    let indexList = [];
    let min = Math.max(page - distance, 2);
    let max = Math.min(page + distance, totalPage - 1)

    for (let i = min; i <= max; i++) {
        indexList[i - min + 1] = i;
    }
    indexList[0] = 1;
    indexList[max - min + 2] = totalPage;

    // Use shallow routing to prevent getServerSideProps from running
    const handlePageChange = (e, newPage) => {
        e.preventDefault();
        if (newPage === page || newPage < 1 || newPage > totalPage) return;
        
        router.push(
            { pathname: router.pathname, query: { ...query, page: newPage } },
            undefined,
            { shallow: true, scroll: false }
        );
    };

    return (
        <>
            {totalPage > 1 &&
                <ul className="pagination">
                    <li className={`page-item ${page < 2 ? 'disabled' : ''}`}>
                        <a 
                            className="page-link page-link-prev" 
                            href="#" 
                            onClick={(e) => handlePageChange(e, page - 1)}
                        >
                            <i className="d-icon-arrow-left"></i>Prev
                        </a>
                    </li>

                    {
                        indexList.map((item, index) => (
                            (index === 1 && item > 2) ?
                                <React.Fragment key={`page-${index}`}>
                                    <span className="page-item dots">...</span>
                                    <li className={`page-item ${page === item ? 'active' : ''}`} >
                                        <a 
                                            className="page-link" 
                                            href="#" 
                                            onClick={(e) => handlePageChange(e, item)}
                                        >
                                            {item}{page === item && <span className="sr-only">(current)</span>}
                                        </a>
                                    </li>
                                </React.Fragment> :
                                (index === indexList.length - 2 && item + 1 < totalPage) ?
                                    <React.Fragment key={`page-${index}`}>
                                        <li className={`page-item ${page === item ? 'active' : ''}`}>
                                            <a 
                                                className="page-link" 
                                                href="#" 
                                                onClick={(e) => handlePageChange(e, item)}
                                            >
                                                {item}{page === item && <span className="sr-only">(current)</span>}
                                            </a>
                                        </li>
                                        <span className="page-item dots">...</span>
                                    </React.Fragment>
                                    :
                                    <li className={`page-item ${page === item ? 'active' : ''}`} key={`page-${index}`}>
                                        <a 
                                            className="page-link" 
                                            href="#" 
                                            onClick={(e) => handlePageChange(e, item)}
                                        >
                                            {item}{page === item && <span className="sr-only">(current)</span>}
                                        </a>
                                    </li>

                        ))
                    }

                    <li className={`page-item ${page > totalPage - 1 ? 'disabled' : ''}`}>
                        <a 
                            className="page-link page-link-next" 
                            href="#" 
                            onClick={(e) => handlePageChange(e, page + 1)}
                        >
                            Next<i className="d-icon-arrow-right"></i>
                        </a>
                    </li>
                </ul>
            }
        </>
    )
}

export default React.memo(Pagination);