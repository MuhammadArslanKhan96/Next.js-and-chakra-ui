import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    IconButton,
    Text,
    Tooltip,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Checkbox
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";
import { usePagination, useTable } from 'react-table';

type TablePropType = {
    columns: any,
    data: {
        id: number,
        firstName: string,
        lastName: string,
        age: number,
        visits: number,
        progress: number,
        status: string
    }[];
}

function CustomTable({ columns, data }: TablePropType) {
    const [checkedRowIds, setCheckedRowIds] = useState<number[]>([])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2 }
        },
        usePagination
    );
    return (
        <>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, idx) => {
                                return (
                                    <Th {...column.getHeaderProps()} key={idx} >{
                                        column.id === "id"
                                            ?
                                            <Checkbox
                                                isChecked={
                                                    checkedRowIds.length ===
                                                    data.map(row => row.id).length
                                                }
                                                onChange={() => {
                                                    const rowIds = data.map(row => row.id);
                                                    if (checkedRowIds.length === rowIds.length) {
                                                        setCheckedRowIds([]);
                                                    } else {
                                                        setCheckedRowIds(rowIds);
                                                    }
                                                }}
                                            />
                                            :
                                            column.render("Header")}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={i} >
                                {row.cells.map((cell, cellIdx) => {
                                    const _id = Number(cell.row.id)
                                    return (
                                        <Td {...cell.getCellProps()} key={cellIdx} >
                                            {cell.column.id === 'id' ?
                                                <Checkbox
                                                    isChecked={checkedRowIds.includes(_id)}
                                                    onChange={event => {
                                                        event.stopPropagation();
                                                        const index = checkedRowIds.indexOf(_id);

                                                        if (index > -1) {
                                                            setCheckedRowIds([
                                                                ...checkedRowIds.slice(0, index),
                                                                ...checkedRowIds.slice(index + 1)
                                                            ]);
                                                        } else {
                                                            setCheckedRowIds([
                                                                ...checkedRowIds,
                                                                _id
                                                            ]);
                                                        }
                                                    }}
                                                ></Checkbox>
                                                :
                                                // cell.render("Cell")
                                                cell.render('Cell')
                                            }</Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>

            <Flex justifyContent="flex-end" m={4} alignItems="center">
                <Flex>
                    <Tooltip label="First Page">
                        <IconButton
                            aria-label="first-page"
                            onClick={() => gotoPage(0)}
                            isDisabled={!canPreviousPage}
                            icon={<ArrowLeftIcon h={3} w={3} />}
                            mr={4}
                        />
                    </Tooltip>
                    <Tooltip label="Previous Page">
                        <IconButton
                            aria-label="previous-page"
                            onClick={previousPage}
                            isDisabled={!canPreviousPage}
                            icon={<ChevronLeftIcon h={6} w={6} />}
                        />
                    </Tooltip>
                </Flex>

                <Flex alignItems="center">
                    <Text flexShrink="0" mr={8} marginLeft={2}>
                        Page{" "}
                        <Text fontWeight="bold" as="span">
                            {pageIndex + 1}
                        </Text>{" "}
                        of{" "}
                        <Text fontWeight="bold" as="span">
                            {pageOptions.length}
                        </Text>
                    </Text>
                    <Text flexShrink="0">Go to page:</Text>{" "}
                    <NumberInput
                        ml={2}
                        mr={8}
                        w={28}
                        min={1}
                        max={pageOptions.length}
                        onChange={(value: any) => {
                            const page = value ? value - 1 : 0;
                            gotoPage(page);
                        }}
                        defaultValue={pageIndex + 1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        w={32}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </Flex>

                <Flex>
                    <Tooltip label="Next Page">
                        <IconButton
                            aria-label="next-page"
                            onClick={nextPage}
                            isDisabled={!canNextPage}
                            icon={<ChevronRightIcon h={6} w={6} />}
                        />
                    </Tooltip>
                    <Tooltip label="Last Page">
                        <IconButton
                            aria-label="prev-page"
                            onClick={() => gotoPage(pageCount - 1)}
                            isDisabled={!canNextPage}
                            icon={<ArrowRightIcon h={3} w={3} />}
                            ml={4}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
}

export default CustomTable