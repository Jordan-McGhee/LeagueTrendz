import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

// hook imports
import { useFetch } from "../../../../Hooks/useFetch"

// type imports
import { GameHighBoxScoreStat } from "@/types";

// utils imports
import { shortenPlayerName, convertDateTeamSchedule } from "../../../../Utils/utils";

// ui imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../../components/ui/card"
import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import LoadingPage from "../../../LoadingPage"
import ErrorModal from "../../../../components/ui/ErrorModal"

const BoxScoresTableView = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    const [seasonType, setSeasonType] = useState<string>('regular-season');
    const [statCategory, setStatCategory] = useState<string>('pts');

    // console.log(`stat category: ${statCategory}`)

    const [tableData, setTableData] = useState<GameHighBoxScoreStat[] | undefined>()

    // Initialize state from URL params
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // setTableType(queryParams.get('tableType') || '');
        setSeasonType(queryParams.get('seasonType') || 'regular-season');
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

    const handleStatCategoryChange = (value: string) => {
        setStatCategory(value);
        updateQueryParam('statCategory', value);
    };

    // fetch from database
    useEffect(() => {
        const url: string = `${process.env.REACT_APP_BACKEND_URL}/nba/players/game-highs/box-scores/${seasonType !== undefined ? seasonType : 'regular-season'}/${statCategory}`

        let responseData: any

        const fetchBoxScoresTable = async () => {
            try {
                responseData = await sendRequest(url)
                setTableData(responseData.games)

                // console.log(responseData.games)
            } catch (error) {

            }
        }

        fetchBoxScoresTable()

    }, [sendRequest, seasonType, statCategory])

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

                {/* stat category */}
                <div>
                    <p className="text-xs font-semibold mb-1">STAT CATEGORY</p>
                    <Select value={statCategory} onValueChange={(newValue) => handleStatCategoryChange(newValue)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="PTS" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="pts">PTS</SelectItem>
                            <SelectItem value="tpm">TPM</SelectItem>
                            <SelectItem value="reb">REB</SelectItem>
                            <SelectItem value="ast">AST</SelectItem>
                            <SelectItem value="stl">STL</SelectItem>
                            <SelectItem value="blk">BLK</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            {!isLoading && tableData &&
                <Card>
                    <CardContent>
                        <Table className="">
                            <TableHeader>
                                <TableRow className="uppercase">
                                    <TableHead>PLAYER</TableHead>
                                    <TableHead>MATCH UP</TableHead>
                                    <TableHead className="text-center px-1.5">DATE</TableHead>
                                    <TableHead className="text-center px-1.5">W/L</TableHead>
                                    <TableHead className="text-center px-1.5">MIN</TableHead>
                                    <TableHead className={statCategory === "pts" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>PTS</TableHead>
                                    <TableHead className="text-center px-1.5">FGM-FGA</TableHead>
                                    <TableHead className="text-center px-1.5">FG%</TableHead>
                                    <TableHead className={statCategory === "tpm" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>3PM-3PA</TableHead>
                                    <TableHead className="text-center px-1.5">3P%</TableHead>
                                    {/* <TableHead classN{statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}ter">FTM-FTA</TableHead> */}
                                    <TableHead className="text-center px-1.5">FT%</TableHead>
                                    <TableHead className={statCategory === "reb" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>REB</TableHead>
                                    <TableHead className={statCategory === "ast" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>AST</TableHead>
                                    <TableHead className={statCategory === "stl" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>STL</TableHead>
                                    <TableHead className={statCategory === "blk" ? "bg-slate-100 text-center px-1.5" : "text-center px-1.5"}>BLK</TableHead>
                                    <TableHead className="text-center">PF</TableHead>
                                    <TableHead className="text-center">TO</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    tableData.map((player) => (
                                        <TableRow key={`${player.player_name}-${player.game_id}`}>
                                            <TableCell>
                                                <Link to={`${process.env.REACT_APP_FRONTEND_URL}/nba/players/id/${player.player_id}/${player.player_name.toLowerCase().replace(" ", "-")}`} className="hover:underline">
                                                    {shortenPlayerName(player.player_name)}
                                                </Link>
                                            </TableCell>
                                            <TableCell>

                                                <Link className="flex gap-x-1 items-center hover:underline" to={`${process.env.REACT_APP_FRONTEND_URL}/nba/games/game_id/${player.game_id}?view=team-stats`}>

                                                    {/* player team */}
                                                    <TeamLogo team_id={player.player_team_id} abbreviation={player.player_team_abbreviation} logoClass="size-4 object-contain" />
                                                    <p>{player.player_team_abbreviation}</p>

                                                    {/* game location */}
                                                    <p>{player.game_location === "HOME" ? "VS" : "@"}</p>

                                                    {/* player team */}
                                                    <TeamLogo team_id={player.opp_team_id} abbreviation={player.opp_team_abbreviation} logoClass="size-4 object-contain" />
                                                    <p>{player.opp_team_abbreviation}</p>
                                                </Link>
                                            </TableCell>

                                            <TableCell className="text-center">{convertDateTeamSchedule(player.game_date, true)}</TableCell>
                                            <TableCell className={player.game_result === "W" ? "text-center text-green-500" : "text-center text-red-500"}>{player.game_result}</TableCell>
                                            <TableCell className="text-center">{player.minutes}</TableCell>
                                            <TableCell className={statCategory === "pts" ? "bg-slate-100 text-center" : "text-center"}>{player.pts}</TableCell>
                                            <TableCell className={statCategory === "fgm" ? "bg-slate-100 text-center" : "text-center"}>{`${player.fgm}-${player.fga}`}</TableCell>
                                            <TableCell className={statCategory === "fg_percentage" ? "bg-slate-100 text-center" : "text-center"}>{player.fg_percentage}%</TableCell>
                                            <TableCell className={statCategory === "tpm" ? "bg-slate-100 text-center" : "text-center"}>{`${player.tpm}-${player.tpa}`}</TableCell>
                                            <TableCell className={statCategory === "tp_percentage" ? "bg-slate-100 text-center" : "text-center"}>{player.tp_percentage}%</TableCell>
                                            {/* <TableCell className="text-center">{perMode === "average" ? `${player.avg_ftm}-${player.avg_fta}` : `${player.ftm}-${player.fta}`}</TableCell> */}
                                            <TableCell className={statCategory === "ft_percentage" ? "bg-slate-100 text-center" : "text-center"}>{player.ft_percentage}%</TableCell>
                                            <TableCell className={statCategory === "reb" ? "bg-slate-100 text-center" : "text-center"}>{player.reb}</TableCell>
                                            <TableCell className={statCategory === "ast" ? "bg-slate-100 text-center" : "text-center"}>{player.ast}</TableCell>
                                            <TableCell className={statCategory === "stl" ? "bg-slate-100 text-center" : "text-center"}>{player.stl}</TableCell>
                                            <TableCell className={statCategory === "blk" ? "bg-slate-100 text-center" : "text-center"}>{player.blk}</TableCell>
                                            <TableCell className={statCategory === "pf" ? "bg-slate-100 text-center" : "text-center"}>{player.pf}</TableCell>
                                            <TableCell className={statCategory === "turnovers" ? "bg-slate-100 text-center" : "text-center"}>{player.turnovers}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            }
        </>
    )
}

export default BoxScoresTableView