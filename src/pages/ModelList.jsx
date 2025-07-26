import {useEffect, useState} from 'react';
import {modelService, brandService} from '../services/api';

function ModelList() {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingModel, setEditingModel] = useState(null);
    const [formData, setFormData] = useState({id: '', name: '', brandId: ''});

    useEffect(() => {
        loadModels();
        loadBrands()
    }, []);


    const loadModels = async () => {
        try {
            setLoading(true);
            const response = await modelService.getAll();
            setModels(response.data.data);
        } catch (error) {
            console.error('Modeller yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadBrands = async () => {
        try {
            const response = await brandService.getAll();
            setBrands(response.data.data);
        } catch (error) {
            console.error('Markalar yüklenirken hata:', error);
        }
    };

    const getBrandName = (brandId) => {
        const brand = brands.find(b => b.id === brandId);
        return brand ? brand.name : 'Bilinmeyen Marka';
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingModel) {
                await modelService.update(formData);
            } else {
                await modelService.create(formData);
            }
            await loadModels();
            resetForm();
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            resetForm();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu modeli silmek istediğinizden emin misiniz?')) {
            try {
                await modelService.delete(id);
                loadModels();
            } catch (error) {
                console.error('Silme hatası:', error);
            }
        }
    };

    const handleEdit = (model) => {
        setEditingModel(model);
        setFormData({
            id: model.id, name: model.name, brandId: model.brandId
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({name: ''});
        setEditingModel(null);
        setShowForm(false);
    };

    if (loading) {
        return <div className="loading">Yükleniyor...</div>;
    }

    return (<div className="page-container">
        <div className="page-header">
            <h2>Modeller</h2>
            <button
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'İptal' : 'Yeni Model Ekle'}
            </button>
        </div>

        {showForm && (<div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Model Adı:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Marka:</label>
                    <select
                        value={formData.brandId}
                        onChange={(e) => setFormData({...formData, brandId: e.target.value})}
                        required
                    >
                        <option value="">Marka Seçiniz</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                        {editingModel ? 'Güncelle' : 'Ekle'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                        İptal
                    </button>
                </div>
            </form>
        </div>)}

        <div className="table-container">
            <table className="data-table">
                <thead>
                <tr>
                    <th>Marka Adı</th>
                    <th>Model Adı</th>
                    <th>İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {models.length === 0 ? (<tr>
                    <td colSpan="6" className="no-data">Henüz model eklenmemiş</td>
                </tr>) : (models.map(model => (<tr key={model.id}>
                    <td>{getBrandName(model.brandId)}</td>
                    <td>{model.name}</td>
                    <td>
                        <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEdit(model)}
                        >
                            Düzenle
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(model.id)}
                        >
                            Sil
                        </button>
                    </td>
                </tr>)))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default ModelList;