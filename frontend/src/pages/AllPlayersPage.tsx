import React, { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom"

// hook imports
import { useFetch } from "../Hooks/useFetch";

// type imports

// ui imports
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { DataTable } from "../components/ui/DataTable";

// component imports
import TeamLogo from "../components/ui/TeamLogo"
import ErrorModal from "../components/ui/ErrorModal"
import LoadingPage from "./LoadingPage"

// views imports
    // season leaders (avg & total)
    // table

const AllPlayersPage = () => {

    return (
        <div>
            All Players Page
        </div>
    )
}

export default AllPlayersPage