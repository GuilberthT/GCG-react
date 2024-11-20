import axios from './axiosInstance';

export interface IncomeType {
  _id: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchIncomeTypes = async (): Promise<IncomeType[]> => {
  const response = await axios.get<IncomeType[]>('/incomeTypes');

  return response.data;
};

// export const IncomeTypeComponent: React.FC = () => {

//   const { data, error, isLoading } = useQuery<IncomeType[], Error>({
//     queryKey: ['incomeTypes'],
//     queryFn: fetchIncomeTypes,
//   });

//   if (isLoading) return <span>Loading...</span>;
//   if (error) return <span>Error: {error.message} </span>;

//   return (
//     <div>
//       <h1>Tipos de Rendimento </h1>
//       <ul>
//         {
//           data?.map((incomeType) => (
//             <li key={incomeType._id} >
//               {incomeType.description}
//               {
//                 incomeType.createdAt && (
//                   <span>
//                     Criado em: {new Date(incomeType.createdAt).toLocaleDateString()}
//                   </span>
//                 )
//               }
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };
