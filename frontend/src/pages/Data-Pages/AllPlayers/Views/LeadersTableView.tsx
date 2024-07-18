import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { TotalsAndAveragesObject } from "@/types";

// utils imports
import { shortenPlayerName } from "../../../../Utils/utils";

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
    const perMode = queryParams.get('perMode') || 'average'
    const statCategory = queryParams.get('statCategory') || undefined


    const [tableData, setTableData] = useState<TotalsAndAveragesObject[] | undefined>()

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/leaders/table/${seasonType !== undefined ? seasonType : 'regular-season'}/${perMode !== undefined ? perMode : 'average'}/${statCategory !== undefined ? statCategory : 'pts'}`

        let responseData: any

        const fetchLeadersTable = async () => {
            try {
                responseData = await sendRequest(url)
                setTableData(responseData.stats)
            } catch (error) {
                
            }
        }

        fetchLeadersTable()

    }, [ sendRequest, seasonType, statCategory, perMode])

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
                                    <SelectItem value="total">Totals</SelectItem>
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
                                    <SelectItem value="fg_percentage">FG%</SelectItem>
                                    <SelectItem value="tpm">TPM</SelectItem>
                                    <SelectItem value="tp_percentage">TP%</SelectItem>
                                    <SelectItem value="ft_percentage">FT%</SelectItem>
                                    <SelectItem value="pf">PF</SelectItem>
                                    <SelectItem value="turnovers">TO</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* bottom section */}
                    <Card>
                        <CardContent>
                            <Table className="text-sm">
                                <TableHeader>
                                    <TableRow className="uppercase">
                                        <TableHead className="w-[175px]">PLAYER</TableHead>
                                        <TableHead className="">TEAM</TableHead>
                                        {/* <TableHead className="text-center">GP</TableHead>
                                        <TableHead className="text-center">Min</TableHead> */}
                                        <TableHead className="text-center">PTS</TableHead>
                                        <TableHead className="text-center">FGM-FGA</TableHead>
                                        <TableHead className="text-center">FG%</TableHead>
                                        <TableHead className="text-center">3PM-3PA</TableHead>
                                        <TableHead className="text-center">3P%</TableHead>
                                        {/* <TableHead className="text-center">FTM-FTA</TableHead> */}
                                        <TableHead className="text-center">FT%</TableHead>
                                        <TableHead className="text-center">REB</TableHead>
                                        <TableHead className="text-center">AST</TableHead>
                                        <TableHead className="text-center">STL</TableHead>
                                        <TableHead className="text-center">BLK</TableHead>
                                        <TableHead className="text-center">PF</TableHead>
                                        <TableHead className="text-center">TO</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        tableData.map((player) => (
                                            <TableRow key={`${player.name}`}>
                                                <TableCell>{shortenPlayerName(player.name)}</TableCell>
                                                <TableCell>
                                                    <Link className="flex gap-x-2 items-center" to={''}>
                                                        <TeamLogo team_id={player.team_id} abbreviation={player.abbreviation} logoClass="size-5 object-contain" />
                                                        <p>{player.abbreviation}</p>
                                                    </Link>
                                                </TableCell>
                                                {/* <TableCell>{player.gp}</TableCell>
                                                <TableCell>{player.avg_min}</TableCell> */}
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_pts : player.pts}</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? `${player.avg_fgm}-${player.avg_fga}` : `${player.fgm}-${player.fga}`}</TableCell>
                                                <TableCell className="text-center">{player.avg_fg_percentage}%</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? `${player.avg_tpm}-${player.avg_tpa}` : `${player.tpm}-${player.tpa}`}</TableCell>
                                                <TableCell className="text-center">{player.avg_tp_percentage}%</TableCell>
                                                {/* <TableCell className="text-center">{perMode === "average" ? `${player.avg_ftm}-${player.avg_fta}` : `${player.ftm}-${player.fta}`}</TableCell> */}
                                                <TableCell className="text-center">{player.avg_ft_percentage}%</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_reb : player.reb}</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_ast : player.ast}</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_stl : player.stl}</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_blk : player.blk}</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_pf : player.pf}</TableCell>
                                                <TableCell className="text-center">{perMode === "average" ? player.avg_turnovers : player.turnovers}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>

                        </CardContent>
                    </Card>
                </div>

            }

        </>
    )
}

export default LeadersTableView