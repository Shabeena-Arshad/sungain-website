import { ref } from "vue";
import { useUtilities } from "@/composable/use-utilities";
import api from "@/api/crud";

export default function useDataTable(url: string, key: string) {
  const { isNotEmptyArray, notify } = useUtilities();
  const filter = ref("");
  const filterOptions = ref("");
  const loading = ref(false);
  const columnFilter = ref<Record<string, unknown>>();

  const pagination = ref({
    sortBy: key || "",
    descending: false,
    page: 1,
    rowsPerPage: 25,
    rowsNumber: 0
  });

  const amenities = ref<any[]>([]);
  const rows = ref<any[]>([]);

  async function getDataTable(params: any) {
    try {
      const { data } = await api.get(url, params);
      return data || [];
    } catch (err: any) {
      if (err.message == "Network Error") {
        notify("No Internet Connection", "negative");
      } else {
        throw new Error(err);
      }
    }
  }

  const loadData = async (props: any) => {
    loading.value = true;
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    const sort = descending ? sortBy + "|desc" : sortBy;

    const params = {
      page,
      per_page: rowsPerPage,
      sort,
      filter: filter.value,
      filterOptions: filterOptions.value,
      column_filter: columnFilter.value
    };

    const data = await getDataTable(params);

    loading.value = false;
    pagination.value.page = data.current_page;
    pagination.value.rowsPerPage = data.per_page;
    pagination.value.rowsNumber = data.total;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;

    rows.value = data.data || [];
    amenities.value = data.amenity || [];

    if (data.amenity && isNotEmptyArray(rows.value)) {
      const amenity = data.amenity;

      rows.value = rows.value.map((item: any) => {
        return {
          ...item,
          amenity: amenity
        };
      });
    }
  };

  const onRefresh = () => {
    loadData({
      pagination: { ...pagination.value, page: 1 }
    });
  };

  const onSearch = (value: string) => {
    filter.value = value;
    loadData({ pagination: { ...pagination.value, page: 1 } });
  };

  const filterTable = (filterDto: any) => {
    filterOptions.value = filterDto;
    loadData({ filter: filter.value, filterOptions: filterDto, pagination: pagination.value });
  };

  return {
    columnFilter,
    filter,
    filterOptions,
    loading,
    pagination,
    rows,
    amenities,

    getDataTable,
    loadData,
    onRefresh,
    onSearch,
    filterTable
  };
}
