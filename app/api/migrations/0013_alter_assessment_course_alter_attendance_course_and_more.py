# Generated by Django 4.2.7 on 2023-12-18 14:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_rename_code_assessment_course_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessment',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.course'),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.course'),
        ),
        migrations.AlterField(
            model_name='exam',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.course'),
        ),
    ]
