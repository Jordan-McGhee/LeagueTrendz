// type imports
import { SplitsTableProps } from "../../../../types"

// ui imports
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../../../ui/table"

const PlayerSplitsTable: React.FC<SplitsTableProps> = ({ data }) => {

    // const { overall_averages, home_averages, away_averages, conference_averages, division_averages, win_averages, loss_averages } = data
    // const averages = [overall_averages, home_averages, away_averages, conference_averages, division_averages, win_averages, loss_averages]

    return (
        <Table className="text-xs mb-2">
            <TableHeader>
                <TableRow>
                    <TableHead>SPLIT</TableHead>
                    <TableHead>GP</TableHead>
                    <TableHead className="text-center">MIN</TableHead>
                    <TableHead className="text-center">PTS</TableHead>
                    <TableHead className="text-center">FG</TableHead>
                    <TableHead className="text-center">FG%</TableHead>
                    <TableHead className="text-center">3P</TableHead>
                    <TableHead className="text-center">3P%</TableHead>
                    <TableHead className="text-center">FT</TableHead>
                    <TableHead className="text-center">FT%</TableHead>
                    <TableHead className="text-center">REB</TableHead>
                    <TableHead className="text-center">AST</TableHead>
                    <TableHead className="text-center">BLK</TableHead>
                    <TableHead className="text-center">STL</TableHead>
                    <TableHead className="text-center">PF</TableHead>
                    <TableHead className="text-center">TO</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                
            </TableBody>
        </Table>
    )
}

export default PlayerSplitsTable