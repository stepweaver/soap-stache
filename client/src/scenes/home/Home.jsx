import MainCarousel from './MainCarousel'; // TODO: Replace with Hero component
import ShoppingList from './ShoppingList';
const Home = () => {
  return (
    <div className='home'>
      <MainCarousel />
      <ShoppingList />
    </div>
  );
}

export default Home;