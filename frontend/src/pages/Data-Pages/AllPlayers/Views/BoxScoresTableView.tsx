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

const BoxScoresTableView = () => {

    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    return (
        <>
            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {/* loading state */}
            {isLoading && <LoadingPage />}

            { !isLoading &&
                <p>BoxScoresView</p>
            }
        </>
    )
}

export default BoxScoresTableView