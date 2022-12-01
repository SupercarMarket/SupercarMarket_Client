import { QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import layout from 'components/layout';
import { MarketDetail } from 'components/market/market-detail';
import MarketTable from 'components/market/marketTable/marketTable';
import queries from 'constants/queries';
import useMarketDetail from 'hooks/queries/useMarketDetail';
import { NextPageContext } from 'next';
import React from 'react';

interface MarketDetailPageProps {
  id: string;
}

const MarketDetailPage = ({ id }: MarketDetailPageProps) => {
  const { data } = useMarketDetail(id);

  if (!data) return <div>로딩중?</div>;

  return (
    <Container
      width="1200px"
      display="flex"
      flexDirection="column"
      margin="20px 0 0 0"
    >
      <MarketDetail data={data.data} />
      <MarketTable markets={data.carList} />
    </Container>
  );
};

MarketDetailPage.Layout = layout;

const queryClient = new QueryClient();

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;

  await queryClient.prefetchQuery(queries.market.detail(id as string));

  return {
    props: {
      id,
    },
  };
};

export default MarketDetailPage;