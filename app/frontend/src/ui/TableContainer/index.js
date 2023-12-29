import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup } from '..';
import { Container } from './styles';

const TableContainer = ({ columns, dataSource, title, options, selection, onRow, isLoading = false }) => {
	const [tableData, setTableData] = useState(dataSource || []);
	const [searchVal, setSearchVal] = useState('');

	useEffect(() => {
		if (searchVal === '') {
			setTableData(dataSource);
		}
	}, [searchVal, dataSource]);

	// search filter
	useEffect(() => {
		if (searchVal) {
			const searchedResult = [];

			dataSource?.map((item) => {
				let hasMached = false;

				return Object.entries(item)?.forEach((data) => {
					if (data?.[1] && typeof data?.[1] === 'string' && data?.[1]?.toLowerCase()?.includes(searchVal?.toLowerCase()) && !hasMached) {
						hasMached = true;
						searchedResult.push(item);
					}
				});
			});

			setTableData(searchedResult);
			return;
		}
	}, [dataSource, searchVal]);

	return (
		<Container>
			<header className="table--header">
				<h6>{title}</h6>

				{options ? (
					<>
						<form
							onSubmit={(e) => {
								e.preventDefault();
							}}
							className="form"
						>
							{!options.disableSearching && (
								<InputGroup
									value={searchVal}
									onChange={({ target: { value } }) => setSearchVal(value)}
									placeholder={options.placeholder || 'Search for an item'}
									isSearching
								/>
							)}

							<div className="button--group">
								{options.button && <Button onClick={() => options.handleButtonClick && options.handleButtonClick()}>{options.button}</Button>}
							</div>
						</form>

						{options.all_link && (
							<Link to={options.all_link}>
								<span>See All</span>
							</Link>
						)}
					</>
				) : null}
			</header>

			<Table columns={columns} dataSource={tableData} rowSelection={selection} onRow={onRow} scroll={{ x: true }} loading={isLoading} />
		</Container>
	);
};

export default TableContainer;
