// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const OverviewPlayerStats = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <p>Stats</p>
                        <p>See All</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead>SPLITS</TableHead>
                            <TableHead>GP</TableHead>
                            <TableHead>MIN</TableHead>
                            <TableHead>FG%</TableHead>
                            <TableHead>3P%</TableHead>
                            <TableHead>FT%</TableHead>
                            <TableHead>REB</TableHead>
                            <TableHead>AST</TableHead>
                            <TableHead>BLK</TableHead>
                            <TableHead>STL</TableHead>
                            <TableHead>PF</TableHead>
                            <TableHead>TO</TableHead>
                            <TableHead>PTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Regular Season</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>2.2</TableCell>
                            <TableCell>4.6</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Career</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>2.2</TableCell>
                            <TableCell>4.6</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OverviewPlayerStats