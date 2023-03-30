import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovieList = () => {
  debugger;
  const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if(error){
    console.log(error);
  }
  return {
    data,
    error,
    isLoading
  }
};

export default useMovieList;