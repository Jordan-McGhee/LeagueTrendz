import { Table, TableHeader, TableRow, TableCell, TableHead, TableFooter, TableBody } from "../../../ui/table"

const PlayerGameLogTable = () => {

    const placeholderArray = Array(6).fill(" ")

    return (
        <Table className="text-xs">
            <TableHeader>
                <TableRow>
                    <TableHead>DATE</TableHead>
                    <TableHead>OPP</TableHead>
                    <TableHead>RESULT</TableHead>
                    <TableHead className="text-center">MIN</TableHead>
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
                    <TableHead className="text-center">PTS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {placeholderArray.map((item) => (
                    <TableRow>
                        <TableCell>SUN 2/18</TableCell>
                        <TableCell>
                            <div className="flex gap-x-1 items-center">
                                <p>VS</p>
                                <div className="size-5 rounded-full bg-red-500" />
                                <p>WEST</p>
                            </div>
                        </TableCell>
                        <TableCell><span className="text-green-700">W</span> 211-186</TableCell>
                        <TableCell className="text-center">37</TableCell>
                        <TableCell className="text-center">4-13</TableCell>
                        <TableCell className="text-center">30.8</TableCell>
                        <TableCell className="text-center">2-6</TableCell>
                        <TableCell className="text-center">33.3</TableCell>
                        <TableCell className="text-center">1-2</TableCell>
                        <TableCell className="text-center">50.0</TableCell>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell className="text-center">7</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell className="text-center">4</TableCell>
                        <TableCell className="text-center">11</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>FEBRUARY</TableCell>
                    <TableCell className="text-center">37.3</TableCell>
                    <TableCell className="text-center">7.4-17.0</TableCell>
                    <TableCell className="text-center">43.8</TableCell>
                    <TableCell className="text-center">3.6-9.3</TableCell>
                    <TableCell className="text-center">38.1</TableCell>
                    <TableCell className="text-center">4.8-5.9</TableCell>
                    <TableCell className="text-center">81.1</TableCell>
                    <TableCell className="text-center">2.0</TableCell>
                    <TableCell className="text-center">10.7</TableCell>
                    <TableCell className="text-center">0.2</TableCell>
                    <TableCell className="text-center">1.1</TableCell>
                    <TableCell className="text-center">2.4</TableCell>
                    <TableCell className="text-center">4.4</TableCell>
                    <TableCell className="text-center">23.2</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default PlayerGameLogTable