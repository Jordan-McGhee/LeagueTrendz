import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

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

    // const queryParams = new URLSearchParams(location.search)
    // const tableType = queryParams.get('tableType') || undefined
    // const seasonType = queryParams.get('seasonType') || 'regular-season'
    // const perMode = queryParams.get('perMode') || 'average'
    // const statCategory = queryParams.get('statCategory') || 'pts'


    const location = useLocation()
    const navigate = useNavigate()
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    const [seasonType, setSeasonType] = useState<string>('regular-season');
    const [perMode, setPerMode] = useState<string>('average');
    const [statCategory, setStatCategory] = useState<string>('pts');

    const [tableData, setTableData] = useState<TotalsAndAveragesObject[] | undefined>()

    // Initialize state from URL params
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // setTableType(queryParams.get('tableType') || '');
        setSeasonType(queryParams.get('seasonType') || 'regular-season');
        setPerMode(queryParams.get('perMode') || 'average');
        setStatCategory(queryParams.get('statCategory') || 'pts');
    }, [location.search]);

    // Function to update URL and state
    const updateQueryParam = (param: string, value: string) => {
        const queryParams = new URLSearchParams(location.search);
        if (value) {
            queryParams.set(param, value);
        } else {
            queryParams.delete(param);
        }
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const handleSeasonTypeChange = (value: string) => {
        setSeasonType(value);
        updateQueryParam('seasonType', value);
    };

    const handlePerModeChange = (value: string) => {
        setPerMode(value);
        updateQueryParam('perMode', value);
    };

    const handleStatCategoryChange = (value: string) => {
        setStatCategory(value);
        updateQueryParam('statCategory', value);
    };


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

    }, [sendRequest, seasonType, statCategory, perMode])

    return (
        <>
            {/* top section */}

            <div className="flex gap-x-2 mb-4">

                {/* season type */}
                <div>
                    <p className="text-xs font-semibold mb-1">SEASON TYPE</p>
                    <Select value={seasonType} onValueChange={(newValue) => handleSeasonTypeChange(newValue)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Regular Season" />
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
                    <Select value={perMode} onValueChange={(newValue) => handlePerModeChange(newValue)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Per Game" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="average">Per Game</SelectItem>
                            <SelectItem value="total">Total</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* stat category */}
                <div>
                    <p className="text-xs font-semibold mb-1">STAT CATEGORY</p>
                    <Select value={statCategory} onValueChange={(newValue) => handleStatCategoryChange(newValue)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="PTS" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="pts">PTS</SelectItem>
                            <SelectItem value="fgm">FGM</SelectItem>

                            {/* FIX */}
                            <SelectItem value="fg_percentage">FG%</SelectItem>
                            <SelectItem value="tpm">TPM</SelectItem>

                            {/* FIX */}
                            <SelectItem value="tp_percentage">TP%</SelectItem>

                            {/* FIX */}
                            <SelectItem value="ft_percentage">FT%</SelectItem>
                            <SelectItem value="reb">REB</SelectItem>
                            <SelectItem value="ast">AST</SelectItem>
                            <SelectItem value="stl">STL</SelectItem>
                            <SelectItem value="blk">BLK</SelectItem>
                            <SelectItem value="pf">PF</SelectItem>
                            <SelectItem value="turnovers">TO</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {!isLoading && tableData &&

                <div>

                    {/* bottom section */}
                    <Card>
                        <CardContent>
                            <Table className="">
                                <TableHeader>
                                    <TableRow className="uppercase">
                                        <TableHead className="w-[175px]">PLAYER</TableHead>
                                        <TableHead className="">TEAM</TableHead>
                                        <TableHead className="text-center">GP</TableHead>
                                        <TableHead className="text-center">Min</TableHead>
                                        <TableHead className={statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}>PTS</TableHead>
                                        <TableHead className={statCategory === "fgm" ? "bg-slate-100 text-center" : "text-center"}>FGM-FGA</TableHead>
                                        <TableHead className={statCategory === "fg_percentage" ? "bg-slate-100 text-center" : "text-center"}>FG%</TableHead>
                                        <TableHead className={statCategory === "tpm" ? "bg-slate-100 text-center" : "text-center"}>3PM-3PA</TableHead>
                                        <TableHead className={statCategory === "tp_percentage" ? "bg-slate-100 text-center" : "text-center"}>3P%</TableHead>
                                        {/* <TableHead classN{statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}ter">FTM-FTA</TableHead> */}
                                        <TableHead className={statCategory === "ft_percentage" ? "bg-slate-100 text-center" : "text-center"}>FT%</TableHead>
                                        <TableHead className={statCategory === "reb" ? "bg-slate-100 text-center" : "text-center"}>REB</TableHead>
                                        <TableHead className={statCategory === "ast" ? "bg-slate-100 text-center" : "text-center"}>AST</TableHead>
                                        <TableHead className={statCategory === "stl" ? "bg-slate-100 text-center" : "text-center"}>STL</TableHead>
                                        <TableHead className={statCategory === "blk" ? "bg-slate-100 text-center" : "text-center"}>BLK</TableHead>
                                        <TableHead className={statCategory === "pf" ? "bg-slate-100 text-center" : "text-center"}>PF</TableHead>
                                        <TableHead className={statCategory === "turnovers" ? "bg-slate-100 text-center" : "text-center"}>TO</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        tableData.map((player) => (
                                            <TableRow key={`${player.name}`}>
                                                <TableCell>
                                                    <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                                        {shortenPlayerName(player.name)}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link className="flex gap-x-2 items-center hover:underline" to={`${process.env.REACT_APP_FRONTEND_URL}/nba/teams/${player.abbreviation.toLowerCase()}?view=home`}>
                                                        <TeamLogo team_id={player.team_id} abbreviation={player.abbreviation} logoClass="size-5 object-contain" />
                                                        <p>{player.abbreviation}</p>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="text-center">{player.gp}</TableCell>
                                                <TableCell className="text-center">{player.avg_min}</TableCell>
                                                <TableCell className={statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_pts : player.pts}</TableCell>
                                                <TableCell className={statCategory === "fgm" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? `${player.avg_fgm}-${player.avg_fga}` : `${player.fgm}-${player.fga}`}</TableCell>
                                                <TableCell className={statCategory === "fg_percentage" ? "bg-slate-100 text-center" : "text-center"}>{player.avg_fg_percentage}%</TableCell>
                                                <TableCell className={statCategory === "tpm" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? `${player.avg_tpm}-${player.avg_tpa}` : `${player.tpm}-${player.tpa}`}</TableCell>
                                                <TableCell className={statCategory === "tp_percentage" ? "bg-slate-100 text-center" : "text-center"}>{player.avg_tp_percentage}%</TableCell>
                                                {/* <TableCell className="text-center">{perMode === "average" ? `${player.avg_ftm}-${player.avg_fta}` : `${player.ftm}-${player.fta}`}</TableCell> */}
                                                <TableCell className={statCategory === "ft_percentage" ? "bg-slate-100 text-center" : "text-center"}>{player.avg_ft_percentage}%</TableCell>
                                                <TableCell className={statCategory === "reb" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_reb : player.reb}</TableCell>
                                                <TableCell className={statCategory === "ast" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_ast : player.ast}</TableCell>
                                                <TableCell className={statCategory === "stl" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_stl : player.stl}</TableCell>
                                                <TableCell className={statCategory === "blk" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_blk : player.blk}</TableCell>
                                                <TableCell className={statCategory === "pf" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_pf : player.pf}</TableCell>
                                                <TableCell className={statCategory === "turnovers" ? "bg-slate-100 text-center" : "text-center"}>{perMode === "average" ? player.avg_turnovers : player.turnovers}</TableCell>
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