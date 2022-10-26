import * as React from 'react';
import { Box, Typography } from '@mui/material';
import PackageDataCard from '../package-data';
import { Container, Draggable } from 'react-smooth-dnd';
import styles from './_index.module.scss';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import AddPackageData from '@/components/package-data/add-package-data';
import CloseIcon from '@mui/icons-material/Close';
import UpdatePackagePageForm from '@/components/package-data/update-package-data';

export interface ColumsCatProps {
    columnCat: any;
    onPackeDrop: any;
}

export default function ColumCat({ columnCat, onPackeDrop }: ColumsCatProps) {
    const dataPackageCards = columnCat.pakageDatas;
    const [showFormAddPackage, setShowFormAddPackage] = React.useState(false);

    const handleCloseFormAddPackage = () => {
        setShowFormAddPackage(false);
    };
    const handleShowFormAddPackage = () => {
        setShowFormAddPackage(!showFormAddPackage);
    };

    return (
        <Box className={styles.wrapColumns}>
            <Typography className={`column-drag-handle ${styles.title}`} fontWeight={'500'}>
                {columnCat.nameCatPackge}
            </Typography>
            <Box className={styles.wrapFlex}>
                <Container
                    groupName="col"
                    onDrop={(dropResult) => onPackeDrop(columnCat._id, dropResult)}
                    getChildPayload={(index) => dataPackageCards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        showOnTop: true,
                        className: 'drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {dataPackageCards.map((dataPackage: any) => (
                        <Draggable key={dataPackage._id}>
                            {/* <Box className={styles.card}>{dataPackage.packageName}</Box> */}
                            <PackageDataCard dataPackageCard={dataPackage} />
                        </Draggable>
                    ))}
                </Container>
            </Box>
            <Box className={styles.addPackage}>
                <Typography className={styles.name} onClick={handleShowFormAddPackage}>
                    <AddIcon />
                    Thêm gói cước
                </Typography>
            </Box>
            <Modal
                open={showFormAddPackage}
                onClose={handleCloseFormAddPackage}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className={styles.popupPackage}>
                    <Box className={styles.icon} onClick={handleCloseFormAddPackage}>
                        <CloseIcon />
                    </Box>
                    <Box className={styles.wrapPackage}>
                        <AddPackageData idCatProp={columnCat._id} />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
