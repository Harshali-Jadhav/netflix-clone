import Billboard from "@/component/Billboard";
import MovieList from "@/component/MovieList";
import Navbar from "@/component/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import InfoModal from "@/component/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context : NextPageContext){
  const session = await getSession(context);

  if(!session){
    return{
      redirect: {
        destination : '/auth',
        permanent : false,
      }
    }
  }
  return{
    props: {}
  }
}

export default function Home() {
  const {data : movies = []} = useMovieList();
  const {data: favorites = []} = useFavorites();
  const {isOpen, closeModal} = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar/>
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
