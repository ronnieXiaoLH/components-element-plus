import Mock from 'mockjs'

const Random = Mock.Random

interface TableData {
  date: string
  name: string
  address: string
}

const tableData: TableData[] = Array.from({ length: 10 }, () => ({
  date: Random.date(),
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}))

Mock.mock('/api/list', (ops: any) => {
  const body = JSON.parse(ops.body)
  return {
    code: 200,
    data: {
      current: body.current,
      pageSize: body.pageSize,
      rows: tableData,
      total: 100,
      totalPages: 10,
    },
  }
})
