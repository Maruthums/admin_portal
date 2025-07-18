import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

function SampleTable({ header, data }: any) {
    return (
        <TableContainer
            component={Paper}
            sx={{ overflowX: 'auto', maxWidth: { xs: window.innerWidth, md: 800 } }}
        >
            <Table aria-label="scrollable table">
                <TableHead>
                    <TableRow>
                        {header?.map((item: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                            <TableCell key={index}>{item}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.family}</TableCell>
                            <TableCell>
                                <img
                                    src={"https://drive.google.com/thumbnail?id=" + row.image + "&sz=w1000"}
                                    width={60}
                                    height={60}
                                    style={{
                                        objectFit: 'contain', borderRadius: '50%',
                                        backgroundColor: '#f0f0f0'
                                    }}
                                    alt="Drive image"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SampleTable;
