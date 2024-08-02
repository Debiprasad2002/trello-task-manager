import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      router.push('/board');
    }
  }, [userInfo, router]);

  return null;
};

export default IndexPage;
