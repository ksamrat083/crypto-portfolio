import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function SparklineChart({ prices }: { prices?: number[] }) {
  const data = (prices ?? []).map((y, i) => ({ i, y }));
  if (data.length === 0) return <div className="w-28 h-10" />;
  return (
    <div className="w-28 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="y" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
