import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import Title from 'components/common/title';
import Magazine from 'components/home/magazine/magazine';
import { MarketBest, MarketNew } from 'components/home/market';
import Layout from 'components/layout';
import queries from 'constants/queries';
import useMagazine from 'hooks/queries/useMagazine';
import useMarket from 'hooks/queries/useMarket';
import { GetServerSideProps } from 'next';

const Home = () => {
  const { data: magazine } = useMagazine();
  const { data: marketBest } = useMarket();
  const { data: marketNew } = useMarket();
  return (
    <Container>
      <Title>슈마매거진</Title>
      {magazine && <Magazine data={magazine.data.slice(0, 5)} />}
      <Title marginTop="80px">매물 관심 베스트</Title>
      {marketBest && <MarketBest marketBest={marketBest.data} />}
      <Title marginTop="40px">최신 매물</Title>
      {marketNew && <MarketNew marketNew={marketNew.data} />}
      <Title marginTop="80px">커뮤니티 인기글</Title>
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(queries.magazine.lists(), () =>
      fetch(`${process.env.NEXT_PULBIC_URL}/api/magazine`, {
        method: 'GET',
      }).then((res) => res.json())
    ),
    queryClient.prefetchQuery(queries.market.best(), () =>
      fetch(`${process.env.NEXT_PULBIC_URL}/api/market`, {
        method: 'GET',
      }).then((res) => res.json())
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

Home.Layout = Layout;
