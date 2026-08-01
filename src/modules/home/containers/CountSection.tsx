import Container from '@/components/shared/Container';
import CountCard from '../components/CountCard';
import { getHomeStats } from '@/lib/api';

const CountSection = async () => {
  const stats = await getHomeStats();

  return (
    <div className="bg-white w-full">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full">
          {stats.map((stat, index) => (
            <CountCard
              key={stat.id}
              count={stat.count}
              text={stat.label}
              className={`border-t border-l border-primary/12${index === stats.length - 1 ? ' border-r' : ''}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CountSection;
