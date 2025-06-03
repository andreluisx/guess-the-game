// const { data, error, isPending } = useQuery({
//   queryKey: ['games'],
//   queryFn: () =>
//     fetch('https://api.igdb.com/v4/games', {
//       headers: {
//         'Client-ID': process.env.CLIENT_ID,
//         Authorization: `Bearer ${process.env.SECRET}`,
//       },
//     }).then((res) => res.json()),
// });

// console.log(data)