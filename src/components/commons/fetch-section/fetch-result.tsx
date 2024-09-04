import LoadingIndicator from "./loading-indicator";
import JsonDisplay from "./json-display";
import { DummyDataResonses } from '@/src/types/response-type';

interface IProps {
  data: DummyDataResonses;
  isLoading: boolean;
}

function FetchResult({ data, isLoading }: IProps) {
  return (
    <div className="relative bg-[#2F2F2F] text-white rounded-[10px] overflow-hidden">
      <LoadingIndicator isLoading={isLoading} />
      <JsonDisplay data={data} />
    </div>
  );
}

export default FetchResult;
