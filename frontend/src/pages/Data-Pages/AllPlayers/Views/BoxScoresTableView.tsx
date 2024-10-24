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
import GameHighBoxScoreTable from "../../../../components/Desktop/AllPlayersPage/Views/GameHighBoxScoreTable"

// mobile component imports
import GameHighBoxScoreTableMobile from "../../../../components/Mobile/AllPlayersPage/Views/GameHighBoxScoreTable-Mobile"

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
                        <SelectTrigger className="w-[150px] md:w-[200px]">
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
                        <SelectTrigger className="">
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
                <div>

                    {/* mobile */}
                    <GameHighBoxScoreTableMobile tableData={tableData} statCategory={statCategory} tableClass="block md:hidden" />


                    {/* desktop */}
                    <GameHighBoxScoreTable tableData={tableData} statCategory={statCategory} tableClass="hidden md:block" />
                </div>
            }
        </>
    )
}

export default BoxScoresTableView