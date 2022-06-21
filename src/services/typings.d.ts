declare namespace Params {}

declare namespace API {
  type IndustryRatioItem = {
    completeCount: number;
    completeRate: string;
    industry: string;
  };
  type AreaCompleteItem = {
    completeCount: number;
    completeRate: string;
    deputy: string;
    place: string;
    principal: string;
    taskCount: number;
  };
  type GetStatistics = {
    code: number | null;
    data: {
      ListByCompleteCount: AreaCompleteItem[];
      ListByCompleteRate: AreaCompleteItem[];
      ListByDeputy: AreaCompleteItem[];
      ListByPlace: { [key: string]: ListByPlace[] };
      completeCount: number;
      completeRate: string;
      industryCount: number;
      industryDataList: AreaCompleteItem[];
      noCount: number;
      totalCount: number;
    };
    message: string;
    success: boolean;
  };
}
