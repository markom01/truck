import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GridOnIcon from "@mui/icons-material/GridOn";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MaterialReactTable from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { utils, writeFile } from "xlsx";
import fetchData from "../functions/fetchData";
import Select from "./Select";

export default function Table() {
  //data and fetching state

  const [initData, setInitData] = useState([]);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const paginationParams = {
    offset: `${pagination.pageIndex * pagination.pageSize}`,
    limit: `${pagination.pageSize}`,
  };

  useEffect(() => {
    (async () => {
      const json = await fetchData({
        data,
        setIsLoading,
        setIsRefetching,
        setIsError,
      });
      setInitData(json);
      setRowCount(json.length);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const json = await fetchData({
        params: paginationParams,
        data,
        setIsLoading,
        setIsRefetching,
        setIsError,
      });
      setData(json);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleExportPDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: ".MuiTable-root" });
    pdf.save("data.pdf");
  };

  const buttonsData = [
    {
      label: "Export To PDF",
      icon: <PictureAsPdfIcon />,
      onClick: handleExportPDF,
    },
    {
      label: "Export To Excel",
      icon: <GridOnIcon />,
      onClick: handleExportExcel,
    },
  ];

  function handleExportExcel() {
    const wb = utils.table_to_book(document.querySelector(".MuiTable-root"));
    writeFile(wb, "SheetJSTable.xlsx");
  }

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString("en-GB"),
      },
      {
        accessorKey: "driver",
        header: "Driver",
        Cell: ({ cell }) => (
          <Box component="span" sx={{ textTransform: "uppercase" }}>
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: "coDriver",
        header: "CoDriver",
        Cell: ({ cell }) => (
          <Box component="span" sx={{ textTransform: "uppercase" }}>
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: "shippingDocs",
        header: "Shipping Docs",
      },
      {
        accessorKey: "dvir",
        header: "DVIR",
        Cell: ({ cell }) => (
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                opacity: 0,
              }}
              component="span"
            >
              {cell.getValue() ? "Yes" : "No"}
            </Box>

            {cell.getValue() ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon />
            )}
          </Box>
        ),
      },
    ],
    []
    //end
  );

  const tableProps = {
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,

      showProgressBars: isRefetching,
    },

    enableStickyHeader: true,
    enableStickyFooter: true,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableGlobalFilter: false,
    manualPagination: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",

          children: "Error loading data",
        }
      : undefined,

    onPaginationChange: setPagination,
    rowCount: rowCount,
    muiTablePaperProps: {
      elevation: 0,
    },

    muiTableContainerProps: {
      sx: {
        maxHeight: "500px",
      },
    },
    muiTableHeadProps: {
      sx: {
        "& tr": {
          bgcolor: "grey.100",
        },
        ".Mui-TableHeadCell-Content-Wrapper": {
          fontWeight: "normal",
        },
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(odd)": {
          bgcolor: "grey.100",
        },
        td: {
          borderRight: "1px solid",
          borderColor: "grey.300",
          paddingBlock: "0.25rem",
          borderBottom: "none",
          fontWeight: "300",
        },
      },
    },
    muiTablePaginationProps: {
      showFirstButton: true,
      showLastButton: true,
      labelRowsPerPage: "Items per page",
      sx: {
        "& :not(.Mui-disabled)": {
          color: "primary.contrastText",
        },
        "& .Mui-disabled": {
          opacity: "0.5",
        },
      },
    },
    muiTopToolbarProps: {
      sx: {
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        bgcolor: "primary.main",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        bgcolor: "primary.main",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        "& .MuiBox-root": {
          right: "unset",
        },
      },
    },
    renderTopToolbarCustomActions: () => (
      <Stack direction="row" gap={1}>
        {buttonsData.map((button) => (
          <Button
            key={button.label}
            startIcon={button.icon}
            variant="contained"
            sx={{
              bgcolor: "grey.100",
              color: "black",
              fontWeight: "300",
              "&:hover": {
                bgcolor: "grey.300",
              },
            }}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </Stack>
    ),
    enableColumnFilters: false,
    columns,
    data,
  };

  return (
    <Stack gap={1}>
      <TableTop
        data={data}
        setData={setData}
        initData={initData}
        setIsError={setIsError}
        setIsLoading={setIsLoading}
        setIsRefetching={setIsRefetching}
        setRowCount={setRowCount}
      />
      <MaterialReactTable {...tableProps} />
    </Stack>
  );
}

function TableTop({
  data,
  setData,
  initData,
  setIsError,
  setIsLoading,
  setIsRefetching,
  setRowCount,
}) {
  const [filters, setFilters] = useState({
    date_gte: "2016-05-01",
    date_lte: "2023-12-01",
    driver_eq: "All",
  });

  // function dateFilter(selectedDate, startingDate, endingDate) {
  //   return (
  //     new Date(selectedDate).getTime() >= new Date(startingDate).getTime() &&
  //     new Date(selectedDate).getTime() <= new Date(endingDate).getTime()
  //   );
  // }

  const buttonsData = [
    { label: "Print", icon: <PrintIcon /> },
    { label: "Send Output File", icon: <InsertDriveFileIcon /> },
    { label: "Send Output File by Mail", icon: <InsertDriveFileIcon /> },
  ];

  return (
    <Stack component="form" direction="row" alignItems="center" gap={4}>
      <TextField
        type="date"
        label="Starting date"
        value={filters.date_gte}
        inputProps={{ max: filters.date_lte }}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, date_gte: e.target.value }))
        }
      />
      <TextField
        type="date"
        label="Ending date"
        value={filters.date_lte}
        inputProps={{ min: filters.date_gte }}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, date_lte: e.target.value }))
        }
      />
      <Select
        initData={initData}
        setFilters={setFilters}
        driver={filters.driver_eq}
      />
      <Button
        sx={{ fontWeight: "bold" }}
        variant="contained"
        onClick={async () => {
          const json = await fetchData({
            params: filters,
            data: initData,
            setIsLoading,
            setIsRefetching,
            setIsError,
          });

          setData(json);
          setRowCount(json.length);
        }}
      >
        Load records
      </Button>

      <Stack direction="row" gap={1} alignItems="center">
        {buttonsData.map((buttonData) => (
          <Button
            key={buttonData.label}
            startIcon={buttonData.icon}
            variant="contained"
            sx={{
              bgcolor: "#2d2e30",
              color: "white",
              "&:hover": { bgcolor: "grey.800" },
            }}
          >
            {buttonData.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
