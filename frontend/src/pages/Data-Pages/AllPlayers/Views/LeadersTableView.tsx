import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch"

// type imports

// utils imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import LoadingPage from "../../../LoadingPage"
import ErrorModal from "../../../../components/ui/ErrorModal"

const LeadersTableView = () => {

    // search params - Regular Season | Playoffs, Stat Category
    // const { tableType, seasonType, statCategory, perMode } = useParams<{ tableType: string, seasonType: string, statCategory: string, perMode: string }>()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tableType = queryParams.get('tableType') || undefined
    const seasonType = queryParams.get('seasonType') || undefined
    const statCategory = queryParams.get('statCategory') || undefined
    const perMode = queryParams.get('perMode') || undefined


    const [tableData, setTableData] = useState(true)

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {!isLoading && tableData &&

                <div>

                    {/* top section */}

                    <div className="flex gap-x-2 mb-4">

                        {/* table type */}
                        {/* <Select>
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value=""></SelectItem>
                                        <SelectItem value=""></SelectItem>
                                    </SelectContent>
                                </Select> */}

                        {/* season type */}
                        <div>
                            <p className="text-xs font-semibold mb-1">SEASON TYPE</p>
                            <Select value={seasonType || "regular-season"} >
                                <SelectTrigger className="w-[200px]">
                                    {/* <SelectValue placeholder="Season Type" /> */}
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="regular-season">Regular Season</SelectItem>
                                    <SelectItem value="playoffs">Playoffs</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* per mode */}
                        <div>
                            <p className="text-xs font-semibold mb-1">PER MODE</p>
                            <Select value={statCategory || 'per-game'}>
                                <SelectTrigger className="w-[200px]">
                                    {/* <SelectValue placeholder="S" /> */}
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="per-game">Per Game</SelectItem>
                                    <SelectItem value="total">Total</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* per mode */}
                        <div>
                            <p className="text-xs font-semibold mb-1">STAT CATEGORY</p>
                            <Select value={perMode || 'PTS'}>
                                <SelectTrigger className="w-[200px]">
                                    {/* <SelectValue placeholder="Stats" /> */}
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="pts">PTS</SelectItem>
                                    <SelectItem value="ast">AST</SelectItem>
                                    <SelectItem value="reb">REB</SelectItem>
                                    <SelectItem value="stl">STL</SelectItem>
                                    <SelectItem value="blk">BLK</SelectItem>
                                    <SelectItem value="fgm">FGM</SelectItem>
                                    <SelectItem value="tpm">TPM</SelectItem>
                                    <SelectItem value="pf">PF</SelectItem>
                                    <SelectItem value="turnovers">TO</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* bottom section */}
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="uppercase">
                                        <TableHead className="">PLAYER</TableHead>
                                        <TableHead className="">TEAM</TableHead>
                                        <TableHead className="text-center">GP</TableHead>
                                        <TableHead className="text-center">Min</TableHead>
                                        <TableHead className="text-center">PTS</TableHead>
                                        <TableHead className="text-center">FGM</TableHead>
                                        <TableHead className="text-center">FGA</TableHead>
                                        <TableHead className="text-center">FG%</TableHead>
                                        <TableHead className="text-center">3PM</TableHead>
                                        <TableHead className="text-center">3PA</TableHead>
                                        <TableHead className="text-center">3P%</TableHead>
                                        <TableHead className="text-center">FTM</TableHead>
                                        <TableHead className="text-center">FTA</TableHead>
                                        <TableHead className="text-center">FT%</TableHead>
                                        <TableHead className="text-center">OREB</TableHead>
                                        <TableHead className="text-center">DREB</TableHead>
                                        <TableHead className="text-center">AST</TableHead>
                                        <TableHead className="text-center">STL</TableHead>
                                        <TableHead className="text-center">BLK</TableHead>
                                        <TableHead className="text-center">TO</TableHead>
                                        <TableHead className="text-center">PF</TableHead>
                                    </TableRow>
                                </TableHeader>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

            }

        </>
    )
}

export default LeadersTableView