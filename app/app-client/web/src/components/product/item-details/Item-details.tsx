import React from "react";
import {IItem} from '../../../../interfaces/interface';
import TranslateService from '../../../services/Translate.service';
import './item-details.scss';

interface Props {
    item: IItem|null;
}

class ItemDetails extends React.Component<Props> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (!this.props.item) {
            return null;
        }

        return (
            <div className="route-item-details">
                {
                    this.props.item.details.images.map((imageUrl: string) =>
                        <a className="item-image-wrapper" key={imageUrl} target="_blank" rel="noopener noreferrer" href={(this.props.item || {fbLink: ''} as IItem).fbLink}>
                            <div className="item-detail-image" style={{backgroundImage: `url(http://localhost:8080/${imageUrl})`}} />
                        </a>
                    )
                }
                <div className="item-detail-wrapper">
                    <div className="item-detail">
                        <div className="item-detail-desc">
                            <div className="item-detail-desc-item">
                                <div className="item-description-title">{TranslateService.translate('forma.commons.label.measurements')}</div>
                                <div className="item-description-value">{this.props.item.details.measurements}</div>
                            </div>
                            <div className="item-detail-desc-item">
                                <div className="item-description-title">{TranslateService.translate('forma.commons.label.product-description')}</div>
                                <div className="item-description-value">{TranslateService.translate(this.props.item.details.description)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemDetails;
