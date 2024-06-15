import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks import
import { useFetch } from "../../../../Hooks/useFetch"

// ui imports
import { Card, CardContent } from "../../../../components/ui/card"
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody, TableFooter } from "../../../../components/ui/table"
import TeamLogo from "../../../../components/ui/TeamLogo"

// component imports
import ErrorModal from "../../../../components/ui/ErrorModal"
import LoadingPage from "../../../../pages/LoadingPage";

const TeamStatsView = () => {



    const { isLoading, hasError, errorMessage, sendRequest, clearError } = useFetch()

    return (
        <>

            {/* error */}
            <ErrorModal error={hasError} errorMessage={errorMessage} onClear={clearError} />

            {isLoading && <LoadingPage />}

        </>
    )
}

export default TeamStatsView