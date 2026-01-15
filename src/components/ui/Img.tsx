export const Img = (name: string, type: 'logo') => {
    const styles = type === 'logo' ? 'w-32 h-32' : '';

    return <img src={`/assets/${name}`} alt={type} className={styles} />;
}