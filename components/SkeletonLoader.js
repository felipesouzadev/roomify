import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div>
      <Skeleton height={40} width="60%" />
      <Skeleton height={200} />
      <Skeleton height={40} width="80%" />
      <Skeleton count={3} />
    </div>
  );
};

export default SkeletonLoader;
