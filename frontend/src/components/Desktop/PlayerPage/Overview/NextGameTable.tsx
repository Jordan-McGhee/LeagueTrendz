// ui imports
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"

const NextGameTable = () => {

    return (
        <div>
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
                        <TableCell>L10</TableCell>
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
                        <TableCell>vs TOR</TableCell>
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
                        <TableCell>HOME</TableCell>
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
        </div>
    )
}

export default NextGameTable