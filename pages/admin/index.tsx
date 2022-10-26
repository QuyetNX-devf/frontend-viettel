import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout';
import { Container as MuiContainer, Typography, Grid, Box } from '@mui/material';
import useSWR from 'swr';
import _ from 'lodash';
import { catPackageApi } from '@/api/cat-data-api';
import { Container, Draggable } from 'react-smooth-dnd';
import ColumCat from '@/components/BoardMainAdmin/columns-cat';
import { mapOder } from '@/utils/sort';
import { applyDrag } from '@/utils/drag-drop';
import { fullBoardApi } from '@/api/fullBoard';
import styles from '@/styles/admin/index.module.scss';
import AddIcon from '@mui/icons-material/Add';
import AddCategory from '@/components/cat-form/add-cat';
import RemoveIcon from '@mui/icons-material/Remove';
import Modal from '@mui/material/Modal';
import AddPackageData from '@/components/package-data/add-package-data';
import CloseIcon from '@mui/icons-material/Close';

type Props = {};
const MIL_PER_HOUR = 60 * 60 * 1000;
const LoginAdminPage = (props: Props) => {
    const [board, setBoard] = useState({});
    const [columnCats, setColumnCats] = useState([]);
    const [showFormAddCat, setShowFormAddCat] = useState(false);

    const {
        data: dataFullBoard,
        error,
        mutate,
    } = useSWR('/fullBoard', {
        dedupingInterval: MIL_PER_HOUR,
        revalidateOnFocus: false,
        // refreshInterval: 1000,
    });

    useEffect(() => {
        if (dataFullBoard) {
            setBoard(dataFullBoard.fullBoard);
            setColumnCats(
                mapOder(
                    dataFullBoard.fullBoard.Categorys,
                    dataFullBoard.fullBoard.CatIdOrder,
                    '_id'
                )
            );
        }
    }, [dataFullBoard]);

    const onColumnDrop = async (dropResult: any) => {
        console.log(dropResult);
        const { payload } = dropResult;
        let ollColumnCats = _.cloneDeep(columnCats);

        let newColumnCats = _.cloneDeep(columnCats);
        newColumnCats = applyDrag(newColumnCats, dropResult);
        const listCatOrder = newColumnCats.map((cat: any) => cat._id);
        console.log(listCatOrder);
        setColumnCats(newColumnCats);
        try {
            await fullBoardApi.updateIndexCatPackageData({
                idColumnCat: payload._id,
                removedIndex: dropResult.removedIndex,
                addedIndex: dropResult.addedIndex,
                listCatOrder: listCatOrder,
            });
        } catch (error) {
            console.log(error);
            alert('Lỗi server !');
            setColumnCats(ollColumnCats);
        }
    };

    const onPackeDrop = async (columnCatId: any, dropResult: any) => {
        if (dropResult.removedIndex != null || dropResult.addedIndex != null) {
            let oldColumnCats = _.cloneDeep(columnCats);
            let newColumnCats = _.cloneDeep(columnCats);

            let currentColumnCat: any = newColumnCats.find((i: any) => i._id === columnCatId);

            currentColumnCat.pakageDatas = applyDrag(currentColumnCat.pakageDatas, dropResult);

            currentColumnCat.packageOrder = currentColumnCat.pakageDatas.map((i: any) => i._id);

            console.log(currentColumnCat.packageOrder);

            setColumnCats((prev: any) => {
                const next = prev.map((columnCat: any) => {
                    if (columnCat._id === currentColumnCat._id) columnCat = currentColumnCat;
                    return columnCat;
                });
                return next;
            });
            try {
                await fullBoardApi.updateIndexPackageData({
                    idColumnCat: (currentColumnCat as any)._id,
                    idPackageDAta: dropResult.payload._id,
                    removedIndex: dropResult.removedIndex,
                    addedIndex: dropResult.addedIndex,
                    listPackageData: currentColumnCat.packageOrder,
                });
                await mutate();
            } catch (error) {
                console.log(error);
                alert('Lỗi server !');
                setColumnCats(oldColumnCats);
            }
        }
    };

    if (_.isEmpty(board)) {
        return <Box>Not Board</Box>;
    }

    return (
        <>
            <MuiContainer>
                <Typography
                    className={styles.title}
                    margin={'20px 0'}
                    borderBottom={'solid 1px'}
                    variant="h6"
                >
                    Thao tác nhanh:
                </Typography>
                <Box className={styles.wrapFlex}>
                    <Container
                        orientation="horizontal"
                        onDrop={onColumnDrop}
                        dragHandleSelector=".column-drag-handle"
                        getChildPayload={(index) => columnCats[index]}
                        dropPlaceholder={{
                            showOnTop: true,
                            className: 'colums-drop-preview-hide',
                        }}
                    >
                        {columnCats.map((columnCat: any) => (
                            <Draggable key={columnCat._id}>
                                <ColumCat columnCat={columnCat} onPackeDrop={onPackeDrop} />
                            </Draggable>
                        ))}

                        <Box className={styles.addCat}>
                            <Typography
                                className={styles.title}
                                onClick={() => setShowFormAddCat(!showFormAddCat)}
                            >
                                {!showFormAddCat ? (
                                    <>
                                        <AddIcon />
                                        Thêm danh mục
                                    </>
                                ) : (
                                    <>
                                        <RemoveIcon />
                                        Đóng lại
                                    </>
                                )}
                            </Typography>
                            {showFormAddCat && <AddCategory />}
                        </Box>
                    </Container>
                </Box>
            </MuiContainer>
        </>
    );
};

LoginAdminPage.Layout = AdminLayout;
export default LoginAdminPage;
